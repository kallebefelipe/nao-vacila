# -*- coding: utf-8 -*-

from .models import Ocorrencia
from .models import Base
from decouple import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class PostgresConnection(object):

    # postgresql_database_url = config('POSTGRESQL_DATABASE_URL')
    postgresql_database_url = 'postgresql://kallebe:kallebedb@nao-vacila.cykxysohpxuc.us-east-2.rds.amazonaws.com:5432/naovacila'

    def __init__(self):
        self.engine = self.get_engine()
        self.create_tables()
        self.Session = sessionmaker(bind=self.engine)

    def create_connection(self):
        return self.Session()

    def create_tables(self):
        Base.metadata.create_all(self.engine)

    def get_engine(self):
        return create_engine(self.postgresql_database_url)


class LoadToPostgres(PostgresConnection):

    """docstring for LoadToPostgres"""

    def __init__(self, row=None):
        super(LoadToPostgres, self).__init__()
        self.row = row
        self.elements = []

    def rows_to_models(self):
        elemento = Ocorrencia(self.row)
        self.elements.append(elemento)

    def save_models(self):

        session = self.create_connection()
        for el in self.elements:
            try:
                session.add(el)
            except:
                session.rollback()
                raise Exception('Elemento nao salvo: %s' % el)
        try:
            session.commit()
        except:
            session.rollback()
            raise Exception('Elemento nao salvo: %s' % el)
        finally:
            session.close()

    def add(self):
        self.rows_to_models()
        self.save_models()

    def get_all(self):
        session = self.create_connection()

        result = session.query(Ocorrencia).all()
        data = []
        for each in result:
            linha = each.__dict__
            linha.pop('_sa_instance_state', None)
            data.append(linha)
        return data
