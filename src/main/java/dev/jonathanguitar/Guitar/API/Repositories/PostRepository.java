package dev.jonathanguitar.Guitar.API.Repositories;

import dev.jonathanguitar.Guitar.API.Models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Optional<List<Post>> findByUserId(Integer userId);
}
