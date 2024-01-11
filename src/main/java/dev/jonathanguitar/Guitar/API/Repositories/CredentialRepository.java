package dev.jonathanguitar.Guitar.API.Repositories;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, Integer> {

//    Credential findCredential(String username, String password);
    Credential findByUsername(String username);
}
