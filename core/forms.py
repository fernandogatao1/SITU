from django import forms
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.core.exceptions import ValidationError

class CadastroForm(forms.ModelForm):
    username = forms.CharField(
        max_length=20,
        validators=[MaxLengthValidator(20)],
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nome de usuário (máx. 20 caracteres)'})
    )
    
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'seu@email.com'})
    )
    
    password = forms.CharField(
        min_length=8,
        max_length=15,
        validators=[MinLengthValidator(8), MaxLengthValidator(15)],
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Senha (8-15 caracteres)'})
    )
    
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirmar senha'})
    )
    
    class Meta:
        model = User
        fields = ['username', 'email']
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise ValidationError('Este nome de usuário já está em uso.')
        return username
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('Este email já está cadastrado.')
        return email
    
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if password and confirm_password and password != confirm_password:
            raise ValidationError('As senhas não coincidem.')
        
        return cleaned_data

class LoginForm(forms.Form):
    username = forms.CharField(max_length=20)
    password = forms.CharField()