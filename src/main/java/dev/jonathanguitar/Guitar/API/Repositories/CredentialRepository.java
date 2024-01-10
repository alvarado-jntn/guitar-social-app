package dev.jonathanguitar.Guitar.API.Repositories;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CredentialRepository extends JpaRepository<Credential, Integer> {

    Credential findCredential(String username, String password);
}
