package dev.jonathanguitar.Guitar.API.Repositories;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public class CredentialRepositoryImpl implements CredentialRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Credential findCredential(String username, String password) {
        TypedQuery<Credential> typedQuery = entityManager.createQuery
                ("SELECT c FROM Credential c WHERE c.username = :username AND c.password = :password",Credential.class);
        typedQuery.setParameter("username", username);
        typedQuery.setParameter("password", password);
        return typedQuery.getSingleResult();
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends Credential> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Credential> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<Credential> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Credential getOne(Integer integer) {
        return null;
    }

    @Override
    public Credential getById(Integer integer) {
        return null;
    }

    @Override
    public Credential getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends Credential> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Credential> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Credential> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Credential> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Credential> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Credential> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Credential, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Credential> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Credential> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Credential> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public List<Credential> findAll() {
        return null;
    }

    @Override
    public List<Credential> findAllById(Iterable<Integer> integers) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {

    }

    @Override
    public void delete(Credential entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends Credential> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Credential> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<Credential> findAll(Pageable pageable) {
        return null;
    }
}
