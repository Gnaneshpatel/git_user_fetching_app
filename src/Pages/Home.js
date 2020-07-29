import React, { useState, useContext } from "react";
import Axios from "axios";

import {
    Row,
    Container,
    Col,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from "reactstrap";

import UserCard from "../components/UserCard";
import Repos from "../components/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Home = () => {

    const context = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [user, setUser] = useState(null);

    const fetchDetails = async () => {
        try {
            const response = await Axios.get(`https://api.github.com/users/${query}`)
            const { data } = response;
            console.log(data);
            setUser(data);
        } catch (error) {
            toast("Not able to locate user", { type: "error" })
        }
    }

    //put ay page behind login page

    if (!context.user?.uid) {
        return <Redirect to="SignIn" />
    }


    return (
        <Container>
            <Row className=" mt-3 mr-auto ml-auto">
                <Col md="5">
                    <InputGroup>
                        <Input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Please provide the username"
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="primary" onClick={fetchDetails}>Fetch User</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {user ? <UserCard user={user} /> : null}
                </Col>
                <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
            </Row>
        </Container>
    );
}

export default Home;