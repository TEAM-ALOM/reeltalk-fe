"use client";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

interface  StarIconI {
    color?: string;
    size?: string;
}

const StartStyle = styled(FontAwesomeIcon)<StarIconI>`
color: ${(props) => props.color || "#FFC107"};
font-size: ${(props) => props.size || "20px"};
`;

export const StarIcon = ({color= "#FFC107", size="20px"} : StarIconI) => (
    <StartStyle icon={faStar} color={color} size={size}/>
);