package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Like;
import dev.jonathanguitar.Guitar.API.Repositories.LikeRepository;
import dev.jonathanguitar.Guitar.API.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private PostService postService;

    // CREATE ------------------------------------------------------------------------------------------------
    public Optional<Like> addNewLike(Like newLike) {
        System.out.println("\n \n \n --- LikeService | addNewLike method called. ---");

        Integer newLikePostId = newLike.getPostId();
        List<Like> likeList = likeRepository.findLikesByPostId(newLikePostId);
        boolean likeIsUnique = false;

        if (likeList.isEmpty()) { // This means the post has no likes at all.
            System.out.println("\n likeList appears to be empty.");
            likeIsUnique = true;
        } else {
            for (int i = 0; i < likeList.size(); i++) {
                System.out.println("\n likeList appears to contain some values.");
                Integer existingPostId = likeList.get(i).getPostId();
                Integer existingUserId = likeList.get(i).getUserId();

                if (existingPostId.equals(newLikePostId) && existingUserId.equals(newLike.getUserId())) {
                    System.out.println("This like DOES NOT appear to be unique.");
                    likeIsUnique = false;
                    break;
                } else {
                    System.out.println("So far this like appears to be unique.");
                    likeIsUnique = true;
                }
            }
        }

        if (likeIsUnique) {
            System.out.println("This like has been added to the database.");
            postService.addLike(newLikePostId);
            return Optional.of(likeRepository.save(newLike));
        } else {
            System.out.println("New Like CANNOT be added to database. A record with same POST ID and USER ID already exists.");
            return Optional.empty();
        }

    }

    // READ   ------------------------------------------------------------------------------------------------
    public List<Like> findLikesByPostId(Integer postId) {
        return likeRepository.findLikesByPostId(postId);
    }

    public Optional<Like> findByLikeId(Integer likeId) {
        return likeRepository.findById(likeId);
    }

    public Like findByPostAndUserId(Integer postId, Integer userId) {
        System.out.println("\n--- LikeService | findByPostAndUserId method ---");
        List<Like> likeList = likeRepository.findLikesByPostId(postId);
        Like like = new Like();
        boolean thisLikeExists = false;

        if (likeList.isEmpty()) {
            System.out.println("\nThis post has no likes.");

        } else {
            for (Like value : likeList) {
                Integer postIdFromList = value.getPostId();
                Integer userIdFromList = value.getUserId();

                if (postIdFromList.equals(postId) && userIdFromList.equals(userId)) {
                    System.out.println("\n--- POST ID and USER ID match. ---");
                    like = likeRepository.getReferenceById(value.getLikeId());
                    System.out.println("like = " + like);
                    thisLikeExists = true;
                }
            }
        }

        if (thisLikeExists) {
            return like;
        } else {
            return null;
        }
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    // DELETE ------------------------------------------------------------------------------------------------
    public void deleteLike(Like like) {
        postService.removeLike(like.getPostId());
        likeRepository.deleteById(like.getLikeId());
    }

}
