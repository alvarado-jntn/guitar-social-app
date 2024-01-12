package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.User;
import dev.jonathanguitar.Guitar.API.Models.UserDetails;
import dev.jonathanguitar.Guitar.API.Repositories.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsService {
    @Autowired
    private UserDetailRepository userDetailRepository;

    // CREATE ------------------------------------------------------------------------------------------------
    public UserDetails addNewDetails ( UserDetails details){
        return userDetailRepository.save(details);
    }
    // READ   ------------------------------------------------------------------------------------------------
    public Optional<UserDetails> getSingleDetails (Integer id){
        return userDetailRepository.findById(id);
    }
    // UPDATE ------------------------------------------------------------------------------------------------
    public UserDetails updateDetails (Integer id, UserDetails details){
        UserDetails updatedDetails = userDetailRepository.getReferenceById(id);

        updatedDetails.setDob(details.getDob());
        updatedDetails.setDescription(details.getDescription());
        updatedDetails.setGuitarCount(details.getGuitarCount());
        updatedDetails.setLevel(details.getLevel());

        return userDetailRepository.save(updatedDetails);
    }
    // DELETE ------------------------------------------------------------------------------------------------
}
