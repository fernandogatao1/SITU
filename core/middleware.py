from django.shortcuts import redirect
from django.urls import resolve
from django.contrib.auth.decorators import login_required

class NavigationControlMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # URLs que NÃO podem ser acessadas diretamente pela barra de endereço
        blocked_direct_urls = ['/index/', '/mapas/', '/perfil/']
        
        # Verifica se a URL atual está na lista de bloqueio
        current_path = request.path

        
        
        # Se for uma URL bloqueada E não for uma requisição interna (via POST ou referer)
        if current_path in blocked_direct_urls:
            # Permite acesso apenas se:
            # 1. Veio de um POST (formulário)
            # 2. Tem um referer interno (veio de dentro do site)
            # 3. É uma requisição AJAX com header específico
            
            referer = request.META.get('HTTP_REFERER', '')
            is_internal = referer.startswith(request.build_absolute_uri('/'))
            
            if request.method != 'POST' and not is_internal:
                # Redireciona para a home
                return redirect('/')
        
        response = self.get_response(request)
        return response