"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import home,index
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('index/', views.index, name='index'),
    path('index/', index),
    path('mapas/', views.mapas, name='mapas'),
    path('cadastro/', views.cadastro_view, name='cadastro'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('api/dados/', views.api_dados_powerbi, name='api_dados'),
    path('api/csv/', views.api_csv_powerbi, name='api_csv'),
    path('powerbi/', views.powerbi_relatorio, name='powerbi_relatorio'),
    path('api/concentracao-urbana/', views.api_concentracao_urbana, name='api_concentracao_urbana'),
    path('api/concentracao-urbana/csv/', views.api_concentracao_csv, name='api_concentracao_csv'),
    path('dashboard-urbano/', views.dashboard_urbano, name='dashboard_urbano'),
    path('templateteste/', views.templateteste, name='templateteste'),
]
