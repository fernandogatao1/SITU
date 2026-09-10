from django.http import HttpResponse
import requests, json, csv, random, os
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import CadastroForm, LoginForm
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import folium
from django.conf import settings
# No início do views.py, adicione:
from django.template.defaulttags import register

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)


# ==================== FUNÇÃO PARA DETECTAR AMBIENTE ====================
def get_geojson_path(filename):
    """
    Retorna o caminho correto do arquivo GeoJSON baseado no ambiente
    """
    # Verifica se está no PythonAnywhere
    if os.path.exists('/home/Arqtec'):
        # Ambiente PythonAnywhere
        return f'/home/Arqtec/Arquitetura/core/static/{filename}'
    else:
        # Ambiente local (VS Code)
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return os.path.join(BASE_DIR, 'core', 'static', filename)


@login_required
def powerbi_relatorio(request):
    return render(request, 'powerbi_relatorio.html')

def templateteste(request):
    return render(request, 'templateteste.html')

def home(request):
    context = {
        'show_cadastro': request.GET.get('show_cadastro') == 'true',
        'show_login': request.GET.get('show_login') == 'true',
        'cidade': 'Tianguá',  # ou vindo do banco
        'stats': [],  # seus stats
        'features': [],  # suas features
    }
    return render(request, 'home.html', context)

def index(request):
    return render(request, 'index.html')

def mapas(request):
    return render(request, 'mapas.html')

def cadastro_view(request):
    if request.user.is_authenticated:
        return redirect('index')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        # Validações
        erros = []
        
        if len(username) > 20:
            erros.append('Usuário deve ter no máximo 20 caracteres.')
        
        if User.objects.filter(username=username).exists():
            erros.append('Este nome de usuário já está em uso.')
        
        if User.objects.filter(email=email).exists():
            erros.append('Este email já está cadastrado.')
        
        if len(password) < 8 or len(password) > 15:
            erros.append('Senha deve ter entre 8 e 15 caracteres.')
        
        if password != confirm_password:
            erros.append('As senhas não coincidem.')
        
        if erros:
            for erro in erros:
                messages.error(request, erro)
            return render(request, 'home.html', {'show_cadastro': True})
        
        # Criar usuário
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        
        # Autenticar e logar
        authenticated_user = authenticate(request, username=username, password=password)
        login(request, authenticated_user)
        
        messages.success(request, 'Cadastro realizado com sucesso!')
        return redirect('index')
    
    return render(request, 'home.html', {'show_cadastro': True})

def login_view(request):
    if request.user.is_authenticated:
        return redirect('index')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, f'Bem-vindo de volta, {username}!')
            return redirect('index')
        else:
            messages.error(request, 'Usuário ou senha inválidos.')
            return render(request, 'home.html', {'show_login': True})
    
    return render(request, 'home.html', {'show_login': True})

def logout_view(request):
    logout(request)
    messages.success(request, 'Você saiu do sistema.')
    return redirect('/')

def api_dados_powerbi(request):
    """
    API que retorna dados em formato JSON para o Power BI consumir.
    Você pode acessar em: http://127.0.0.1:8000/api/dados/
    """
    
    # GERANDO DADOS FALSOS PARA TESTE (simulando dados do banco)
    # Depois você substitui pelos dados reais do seu sistema
    
    # Lista de cidades fictícias
    cidades = [
        'Tianguá', 'Ubajara', 'Viçosa', 'São Benedito', 'Ibiapina',
        'Guaraciaba', 'Carnaubal', 'Ipu', 'Nova Russas', 'Hidrolândia'
    ]
    
    # Indicadores fictícios
    indicadores = [
        'Infraestrutura', 'Saneamento', 'Educação', 'Saúde', 'Segurança',
        'Mobilidade', 'Meio Ambiente', 'Desenvolvimento Econômico'
    ]
    
    dados = []
    
    # Gerar 50 registros aleatórios para teste
    for i in range(50):
        cidade = random.choice(cidades)
        indicador = random.choice(indicadores)
        valor = round(random.uniform(0, 100), 1)  # valor entre 0 e 100
        ano = random.choice([2020, 2021, 2022, 2023, 2024])
        
        # Data aleatória
        data_inicio = datetime(ano, 1, 1)
        data_aleatoria = data_inicio + timedelta(days=random.randint(0, 364))
        
        dado = {
            'id': i + 1,
            'cidade': cidade,
            'indicador': indicador,
            'valor': valor,
            'ano': ano,
            'data': data_aleatoria.strftime('%Y-%m-%d'),
            'classificacao': 'Bom' if valor >= 70 else ('Regular' if valor >= 40 else 'Ruim')
        }
        dados.append(dado)
    
    # Aplicar filtros se enviados via URL (ex: /api/dados/?cidade=Tianguá)
    cidade_filtro = request.GET.get('cidade')
    indicador_filtro = request.GET.get('indicador')
    ano_filtro = request.GET.get('ano')
    classificacao_filtro = request.GET.get('classificacao')
    
    if cidade_filtro:
        dados = [d for d in dados if cidade_filtro.lower() in d['cidade'].lower()]
    
    if indicador_filtro:
        dados = [d for d in dados if indicador_filtro.lower() in d['indicador'].lower()]
    
    if ano_filtro:
        dados = [d for d in dados if d['ano'] == int(ano_filtro)]
    
    if classificacao_filtro:
        dados = [d for d in dados if d['classificacao'].lower() == classificacao_filtro.lower()]
    
    # Retornar dados em JSON
    return JsonResponse({
        'success': True,
        'total_registros': len(dados),
        'dados': dados
    }, json_dumps_params={'ensure_ascii': False})


# ========== API PARA POWER BI (CSV) ==========
def api_csv_powerbi(request):
    """
    API que retorna dados em formato CSV (mais fácil para o Power BI)
    Acesse: http://127.0.0.1:8000/api/csv/
    """
    
    # Mesma lógica de geração de dados
    cidades = ['Tianguá', 'Ubajara', 'Viçosa', 'São Benedito', 'Ibiapina']
    indicadores = ['Infraestrutura', 'Saneamento', 'Educação', 'Saúde']
    
    # Criar resposta HTTP com tipo CSV
    response = HttpResponse(content_type='text/csv; charset=utf-8')
    response['Content-Disposition'] = 'attachment; filename="dados_territoriais.csv"'
    
    # Criar escritor CSV
    writer = csv.writer(response)
    
    # Escrever cabeçalho
    writer.writerow(['ID', 'Cidade', 'Indicador', 'Valor', 'Ano', 'Data', 'Classificacao'])
    
    # Escrever dados
    for i in range(30):
        cidade = random.choice(cidades)
        indicador = random.choice(indicadores)
        valor = round(random.uniform(0, 100), 1)
        ano = random.choice([2020, 2021, 2022, 2023])
        data = f"{ano}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}"
        classificacao = 'Bom' if valor >= 70 else ('Regular' if valor >= 40 else 'Ruim')
        
        writer.writerow([i+1, cidade, indicador, valor, ano, data, classificacao])
    
    return response


# ==================== API PARA DADOS DE CONCENTRAÇÃO URBANA (NOVA) ====================
@csrf_exempt
def api_concentracao_urbana(request):
    """
    API que retorna os dados do GeoJSON de concentração urbana para o Power BI.
    Acesse local: http://127.0.0.1:8000/api/concentracao-urbana/
    Acesse produção: https://arqtec.pythonanywhere.com/api/concentracao-urbana/
    """
    
    # Usar a função auxiliar para encontrar o caminho correto
    geojson_path = get_geojson_path('concentracaourbana.geojson')
    
    # Debug: imprime o caminho no console do servidor
    print(f"📁 Procurando GeoJSON em: {geojson_path}")
    
    try:
        with open(geojson_path, 'r', encoding='utf-8') as f:
            geojson_data = json.load(f)
        print(f"✅ GeoJSON carregado com sucesso!")
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {geojson_path}")
        return JsonResponse({
            'success': False,
            'error': 'Arquivo GeoJSON não encontrado',
            'caminho_procurado': geojson_path
        }, status=404)
    except json.JSONDecodeError as e:
        print(f"❌ Erro ao decodificar JSON: {e}")
        return JsonResponse({
            'success': False,
            'error': 'Erro ao ler o arquivo GeoJSON',
            'detalhe': str(e)
        }, status=500)
    
    # Lista para armazenar os dados extraídos
    dados = []
    
    # Extrair as propriedades de cada feature
    for feature in geojson_data['features']:
        props = feature.get('properties', {})
        
        # Extrair os campos relevantes
        dado = {
            'codigo_setor': props.get('CD_SETOR', ''),
            'situacao': props.get('SITUACAO', ''),
            'area_km2': props.get('AREA_KM2', None),
            'municipio': props.get('NM_MUN', ''),
            'bairro': props.get('NM_BAIRRO', ''),
            'densidade_demografica': props.get('Areapopulacional_DENSIDADE_DEMOGRAFICA_DOMICILIADA_HAB_KM2', None),
            'populacao': props.get('Areapopulacional_v0001', 0),
            'domicilios': props.get('Areapopulacional_v0002', 0),
            'media_moradores_por_domicilio': props.get('Areapopulacional_v0005', 0),
            'regiao_geografica': props.get('NM_RGINT', ''),
            'distrito': props.get('NM_DIST', ''),
        }
        
        # Calcular densidade se não existir diretamente
        if dado['densidade_demografica'] is None and dado['area_km2'] and dado['populacao']:
            if dado['area_km2'] > 0:
                dado['densidade_demografica'] = round(dado['populacao'] / dado['area_km2'], 2)
        
        dados.append(dado)
    
    # Parâmetros de filtro via URL (opcionais para Power BI)
    bairro_filtro = request.GET.get('bairro')
    setor_filtro = request.GET.get('setor')
    min_densidade = request.GET.get('min_densidade')
    max_densidade = request.GET.get('max_densidade')
    
    # Aplicar filtros
    dados_filtrados = dados
    if bairro_filtro:
        dados_filtrados = [d for d in dados_filtrados if bairro_filtro.lower() in d['bairro'].lower()]
    if setor_filtro:
        dados_filtrados = [d for d in dados_filtrados if setor_filtro in d['codigo_setor']]
    if min_densidade:
        dados_filtrados = [d for d in dados_filtrados if d['densidade_demografica'] and d['densidade_demografica'] >= float(min_densidade)]
    if max_densidade:
        dados_filtrados = [d for d in dados_filtrados if d['densidade_demografica'] and d['densidade_demografica'] <= float(max_densidade)]
    
    # Retornar os dados em JSON
    return JsonResponse({
        'success': True,
        'total_registros': len(dados_filtrados),
        'dados': dados_filtrados,
        'fonte': 'GeoJSON - Concentração Urbana Tianguá',
        'ultima_atualizacao': '2024'
    }, json_dumps_params={'ensure_ascii': False})


# ==================== API PARA CSV DA CONCENTRAÇÃO URBANA ====================
def api_concentracao_csv(request):
    """
    API que retorna os dados em formato CSV para o Power BI.
    Acesse local: http://127.0.0.1:8000/api/concentracao-urbana/csv/
    Acesse produção: https://arqtec.pythonanywhere.com/api/concentracao-urbana/csv/
    """
    
    geojson_path = get_geojson_path('concentracaourbana.geojson')
    
    try:
        with open(geojson_path, 'r', encoding='utf-8') as f:
            geojson_data = json.load(f)
    except FileNotFoundError:
        return HttpResponse(f"Arquivo não encontrado em: {geojson_path}", status=404)
    
    # Criar resposta CSV
    response = HttpResponse(content_type='text/csv; charset=utf-8')
    response['Content-Disposition'] = 'attachment; filename="concentracao_urbana_tiangua.csv"'
    
    writer = csv.writer(response)
    
    # Cabeçalho
    writer.writerow([
        'Codigo_Setor', 'Situacao', 'Area_km2', 'Municipio', 
        'Bairro', 'Densidade_hab_km2', 'Populacao', 
        'Domicilios', 'Media_Moradores', 'Regiao', 'Distrito'
    ])
    
    # Dados
    for feature in geojson_data['features']:
        props = feature.get('properties', {})
        writer.writerow([
            props.get('CD_SETOR', ''),
            props.get('SITUACAO', ''),
            props.get('AREA_KM2', ''),
            props.get('NM_MUN', ''),
            props.get('NM_BAIRRO', ''),
            props.get('Areapopulacional_DENSIDADE_DEMOGRAFICA_DOMICILIADA_HAB_KM2', ''),
            props.get('Areapopulacional_v0001', ''),
            props.get('Areapopulacional_v0002', ''),
            props.get('Areapopulacional_v0005', ''),
            props.get('NM_RGINT', ''),
            props.get('NM_DIST', ''),
        ])
    
    return response


# ==================== DASHBOARD URBANO (MODIFICADO - SOLUÇÃO A) ====================
# views.py - função dashboard_urbano COMPLETA e CORRIGIDA

# views.py - função dashboard_urbano

def dashboard_urbano(request):
    import json
    
    # Caminho do seu GeoJSON
    geojson_path = os.path.join(settings.BASE_DIR, 'core', 'static', 'concentracaourbana.geojson')
    
    # 1. Carrega o GeoJSON
    with open(geojson_path, 'r', encoding='utf-8') as f:
        geojson_data = json.load(f)
    
    # 2. Extrai as propriedades para um DataFrame
    features = geojson_data['features']
    dados = []
    for feature in features:
        props = feature['properties']
        dados.append({
            'setor': props.get('CD_SETOR'),
            'bairro': props.get('NM_BAIRRO'),
            'populacao': props.get('Areapopulacional_v0001', 0),
            'domicilios': props.get('Areapopulacional_v0002', 0),
            'densidade': props.get('Areapopulacional_DENSIDADE_DEMOGRAFICA_SETOR_HAB_KM2', 0),
            'area_km2': props.get('AREA_KM2', 0),
            'situacao': props.get('SITUACAO'),
        })
    
    df = pd.DataFrame(dados)
    
    # 3. Cruzamentos
    pop_por_bairro = df.groupby('bairro')['populacao'].sum().sort_values(ascending=False).to_dict()
    densidade_por_bairro = df.groupby('bairro')['densidade'].mean().round(2).to_dict()
    top_setores = df.nlargest(5, 'populacao')[['setor', 'bairro', 'populacao']].to_dict('records')
    
    # 4. Dados para o gráfico (Top 5 bairros)
    bairros_top5_lista = []
    for bairro, pop in pop_por_bairro.items():
        if bairro:
            bairros_top5_lista.append({'bairro': bairro, 'populacao': pop})
        if len(bairros_top5_lista) >= 5:
            break
    
    # 5. Dados para a tabela de densidade
    tabela_densidade = []
    for bairro, pop in pop_por_bairro.items():
        if bairro:
            tabela_densidade.append({
                'bairro': bairro,
                'populacao': pop,
                'densidade': densidade_por_bairro.get(bairro, 0)
            })
    tabela_densidade.sort(key=lambda x: x['populacao'], reverse=True)
    
    # 6. Lista de bairros
    bairros = sorted(df['bairro'].dropna().unique())
    
    # 7. CONVERTER PARA JSON STRING (importante!)
    df_json_string = json.dumps(df.to_dict('records'), ensure_ascii=False)
    
    print(f"Total de registros: {len(df)}")
    
    context = {
        'pop_por_bairro': pop_por_bairro,
        'densidade_por_bairro': densidade_por_bairro,
        'top_setores': top_setores,
        'total_populacao': df['populacao'].sum(),
        'total_domicilios': df['domicilios'].sum(),
        'area_total_km2': df['area_km2'].sum(),
        'bairros': bairros,
        'df_json_string': df_json_string,  # <-- AGORA É UMA STRING JSON
        'bairros_top5_json': bairros_top5_lista,
        'tabela_densidade': tabela_densidade,
    }
    
    return render(request, 'dashboard_urbano.html', context)