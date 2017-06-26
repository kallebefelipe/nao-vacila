from django.conf.urls import url
from ocorrencia import views

urlpatterns = [
    url(r'^ocorrencia/$', views.ocorrencia),
]
