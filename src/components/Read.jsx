import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios'
// import {
//     CardMeta,
//     CardHeader,
//     CardGroup,
//     CardDescription,
//     CardContent,
//     Button,
//     Card,
// } from 'semantic-ui-react';


export const Read = () => {
    const [APIdata, setAPIdata] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        axios.get('https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData')
            .then((response) => {
                setAPIdata(response.data);
            }).then(setProgress(100))
    }, []);

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }

    const onDelete = (id) => {
        axios.delete(`https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData/${id}`)
            .then(() => {
                getData();
            })
    }

    const getData = () => {
        axios.get(`https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData`)
            .then((getData) => {
                setAPIdata(getData.data);
            })
    }

    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(100)}
            />

            <Container>
                <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
                    {APIdata.map(data => (
                        <Card key={data.id} className="fluid">
                            <Card.Content>
                                <Card.Header>{data.firstName} {data.lastName}</Card.Header>
                                <Label as='a' color='teal' ribbon='right'>
                                    <Icon name="check" /> {data.checkbox ? 'checkbox' : 'Unchecked'}
                                </Label>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Link to={'/update'}>
                                        <Button basic color='green' onClick={() => setData(data)}>
                                            Update
                                        </Button>
                                    </Link>
                                    <Button basic color='red' onClick={() => onDelete(data.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Container>
        </div>
    )
}
