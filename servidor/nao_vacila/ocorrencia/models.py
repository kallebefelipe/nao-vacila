# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Ocorrencia(Base):

    __tablename__ = 'ocorrencia'

    id = Column(Integer, primary_key=True, autoincrement=True)
    descricao = Column(String, nullable=True)
    rua = Column(String, nullable=True)
    tipo = Column(String, nullable=True)
    coordenada_x = Column(String, nullable=True)
    coordenada_y = Column(String, nullable=True)

    def __init__(self, row):
        if 'descricao' in row:
            self.descricao = row['descricao']
        if 'rua' in row:
            self.rua = row['rua']
        if 'tipo' in row:
            self.tipo = row['tipo']
        if 'coodenada_x' in row:
            self.coordenada_x = row['coordenada_x']
        if 'coodenada_y' in row:
            self.coordenada_y = row['coordenada_y']
