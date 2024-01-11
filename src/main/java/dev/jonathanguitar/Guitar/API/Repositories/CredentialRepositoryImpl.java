//package dev.jonathanguitar.Guitar.API.Repositories;
//
//import dev.jonathanguitar.Guitar.API.Models.Credential;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import jakarta.persistence.TypedQuery;
//import org.springframework.data.domain.Example;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.repository.query.FluentQuery;
//import org.springframework.stereotype.Repository;
//
//import javax.swing.text.html.Option;
//import java.util.List;
//import java.util.Optional;
//import java.util.function.Function;
//
//@Repository
//public abstract class CredentialRepositoryImpl implements CredentialRepository {
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//
////    public Credential findCredential(String username, String password) {
////        TypedQuery<Credential> typedQuery = entityManager.createQuery
////                ("SELECT c FROM Credential c WHERE c.username = :username AND c.password = :password",Credential.class);
////        typedQuery.setParameter("username", username);
////        typedQuery.setParameter("password", password);
////        return typedQuery.getSingleResult();
////    }
//
//}
