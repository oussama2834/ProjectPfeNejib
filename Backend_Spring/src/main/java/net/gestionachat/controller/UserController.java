package net.gestionachat.controller;

import java.util.List;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.gestionachat.dto.UserDto;
import net.gestionachat.service.interFace.UserService;


@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class UserController {


	private final UserService userService;


	  @PostMapping("/createUser")
	    public UserDto createAdmin(@RequestBody UserDto UserDto) {

		  return userService.save(UserDto);
	    }


	    @GetMapping("/findByIdUser/{id}")
	    public UserDto findById(@PathVariable Integer id) {
	        return userService.findById(id);
	    }


		  @GetMapping("/findAllUser")
		  public List<UserDto> findAll() { return
				  userService.findAll(); }

	    @DeleteMapping("/removeUser/{id}")
	    public void delete(@PathVariable("id") Integer id) {
			userService.delete(id);
	    }



	@PostMapping("/update")
	public UserDto UpdatUserDto(@RequestBody UserDto dto) {
		return userService.updateUser(dto);
	}
}
