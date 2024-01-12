package dev.jonathanguitar.Guitar.API.Repositories;

import dev.jonathanguitar.Guitar.API.Models.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetails, Integer> {
}
