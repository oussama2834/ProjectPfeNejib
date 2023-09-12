package net.gestionachat.service.impl;

import net.gestionachat.entities.Role;
import net.gestionachat.repository.RoleRepository;
import net.gestionachat.service.interFace.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleImpService implements RoleService {
 @Autowired
   private  RoleRepository roleRepository;
    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}
