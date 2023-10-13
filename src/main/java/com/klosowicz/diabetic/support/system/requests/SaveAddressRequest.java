package com.klosowicz.diabetic.support.system.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaveAddressRequest {   // adres głównie tworze przy rejestrowaniu wiec tam trzeba walidacje do niego też dać

    private String city;

    private String postalCode;

    private String street;

    private String houseNumber;
}
