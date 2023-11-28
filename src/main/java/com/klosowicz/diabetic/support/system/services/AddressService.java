package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.requests.SaveAddressRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;


    @Transactional
    public Address createAddress(SaveAddressRequest request) {
        Address address = Address.builder()
                .city(request.getCity())
                .postalCode(request.getPostalCode())
                .street(request.getStreet())
                .houseNumber(request.getHouseNumber())
                .build();

        addressRepository.save(address);

        return address;
    }

    public Address updateAddress(Long id, SaveAddressRequest request) {
        Address address = addressRepository.findById(id).orElseThrow(); //TODO wyrzucać wyjątek jeśli nie istnieje

        address.setCity(request.getCity());
        address.setPostalCode(request.getPostalCode());
        address.setStreet(request.getStreet());
        address.setHouseNumber(request.getHouseNumber());

        addressRepository.save(address);

        return address;
    }
}
