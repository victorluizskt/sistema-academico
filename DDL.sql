-- Gerado por Oracle SQL Developer Data Modeler 21.4.2.059.0838
--   em:        2022-06-22 14:09:26 BRT
--   site:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE aluno (
    matricula INTEGER NOT NULL,
    nome      VARCHAR2(30) NOT NULL,
    email     VARCHAR2(50),
    id_curso  INTEGER NOT NULL,
    usuario   VARCHAR2(50) NOT NULL,
    senha     VARCHAR2(50) NOT NULL
);

ALTER TABLE aluno ADD CONSTRAINT aluno_pk PRIMARY KEY ( matricula );

CREATE TABLE curso (
    id_curso      INTEGER NOT NULL,
    nome          VARCHAR2(30) NOT NULL,
    carga_horaria INTEGER,
    id_sala       INTEGER NOT NULL
);

ALTER TABLE curso ADD CONSTRAINT curso_pk PRIMARY KEY ( id_curso );

CREATE TABLE disciplina (
    nome_disciplina VARCHAR2(30) NOT NULL,
    id_disciplina   INTEGER NOT NULL,
    carga_horaria   INTEGER NOT NULL,
    horario         VARCHAR2(5) NOT NULL,
    id_sala         INTEGER NOT NULL,
    id_curso        INTEGER NOT NULL,
    qnt_max_aluno   INTEGER,
    id_turma        INTEGER NOT NULL,
    id_professor    INTEGER NOT NULL
);

ALTER TABLE disciplina ADD CONSTRAINT materia_pk PRIMARY KEY ( id_disciplina );

CREATE TABLE metricas_aluno (
    matricula        INTEGER NOT NULL,
    frequencia       INTEGER NOT NULL,
    nota             INTEGER NOT NULL,
    id_turma         INTEGER NOT NULL,
    id_professor     INTEGER NOT NULL,
    id_metrica_aluno INTEGER NOT NULL
);

ALTER TABLE metricas_aluno ADD CONSTRAINT metricas_aluno_pk PRIMARY KEY ( id_metrica_aluno );

CREATE TABLE professor (
    nome_professor VARCHAR2(30) NOT NULL,
    id_professor   INTEGER NOT NULL,
    id_disciplina  INTEGER NOT NULL,
    usuario        VARCHAR2(40) NOT NULL,
    senha          VARCHAR2(50) NOT NULL
);

ALTER TABLE professor ADD CONSTRAINT professor_pk PRIMARY KEY ( id_professor );

CREATE TABLE sala (
    id_sala     INTEGER NOT NULL,
    numero_sala INTEGER NOT NULL
);

ALTER TABLE sala ADD CONSTRAINT sala_pk PRIMARY KEY ( id_sala );

CREATE TABLE turma (
    id_disciplina     INTEGER NOT NULL,
    id_metricas_aluno INTEGER NOT NULL
);

ALTER TABLE curso
    ADD CONSTRAINT curso_sala_fk FOREIGN KEY ( id_sala )
        REFERENCES sala ( id_sala );

ALTER TABLE disciplina
    ADD CONSTRAINT disciplina_curso_fk FOREIGN KEY ( id_curso )
        REFERENCES curso ( id_curso );

ALTER TABLE metricas_aluno
    ADD CONSTRAINT metricas_aluno_aluno_fk FOREIGN KEY ( matricula )
        REFERENCES aluno ( matricula );

ALTER TABLE metricas_aluno
    ADD CONSTRAINT metricas_aluno_professor_fk FOREIGN KEY ( id_professor )
        REFERENCES professor ( id_professor );

ALTER TABLE professor
    ADD CONSTRAINT professor_disciplina_fk FOREIGN KEY ( id_disciplina )
        REFERENCES disciplina ( id_disciplina );

ALTER TABLE turma
    ADD CONSTRAINT turma_disciplina_fk FOREIGN KEY ( id_disciplina )
        REFERENCES disciplina ( id_disciplina );

ALTER TABLE turma
    ADD CONSTRAINT turma_metricas_aluno_fk FOREIGN KEY ( id_metricas_aluno )
        REFERENCES metricas_aluno ( id_metrica_aluno );



-- Relatório do Resumo do Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             7
-- CREATE INDEX                             0
-- ALTER TABLE                             13
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
