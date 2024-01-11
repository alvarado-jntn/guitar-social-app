package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.User;
import dev.jonathanguitar.Guitar.API.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;

    // CREATE ------------------------------------------------------------------------------------------------
    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    // READ ------------------------------------------------------------------------------------------------
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByFirstName(String firstName) {
        return userRepository.findByFirstName(firstName);
    }

    public Optional<User> findById(Integer id){
        return userRepository.findById(id);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    public User updateUser(Integer id, User userUpdate) {
        User u = userRepository.getReferenceById(id);
        u.setFirstName(userUpdate.getFirstName());
        u.setLastName(userUpdate.getLastName());
        u.setEmail(userUpdate.getEmail());
        return userRepository.save(u);
    }
    // DELETE ------------------------------------------------------------------------------------------------
    public void deleteUser(Integer id){
        userRepository.deleteById(id);

    }
}
