import styled from "styled-components";

export const ItemContainer = styled.div`
    width: 80%;

    h3 {
        font-size: 32px;
        color: #FAFAFA;
    }

    p {
        font-size:16px;
        color: #FAFAFA60;
        margin-bottom:20px;
    }

    .ver, .remover {
        background-color: transparent;
        border: 1px solid;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .ver {
        color: #00FF88;
        border-color: #00FF88;
    }

    .ver:hover {
        background-color: #00FF88;
        color: #000000;
        box-shadow: 0 0 10px #00FF8850;
    }

    .remover {
        color: #FF5555;
        border-color: #FF5555;
    }

    .remover:hover {
        background-color: #FF5555;
        color: #000000;
        box-shadow: 0 0 10px #FF555550;
    }

    hr {
        border: none;
        border-top: 1px solid #FAFAFA60;
        margin: 20px 0;
    }
    div button {
        margin-right: 10px;
    }
`