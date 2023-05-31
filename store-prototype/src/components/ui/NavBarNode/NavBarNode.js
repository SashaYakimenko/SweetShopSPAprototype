import {Link} from "react-router-dom";
import React from "react";

export function NavBarNode({ nodeAddress, nodeName })
{
    return(
        <Link to={nodeAddress}>{nodeName}</Link>
    )
}