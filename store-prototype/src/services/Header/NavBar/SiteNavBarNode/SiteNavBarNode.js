import React from "react";
import { NavBarNode } from "../../../../components/ui/NavBarNode/NavBarNode.js";

export function SiteNavBarNode({ address })
{

    var name = address.substring(1);
    name = name[0].toUpperCase() + name.substring(1);
    
    return(
            <NavBarNode nodeAddress={address} nodeName={name}/>
    )
}