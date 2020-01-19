import React from 'react';
import axios from 'axios';
import "./list.css";

export class Table extends React.Component<> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: "",
            data: null
        };
    }

    loadData = () => {
        this.setState({ loading: true });
        var URL = "http://localhost:4000/graphql?";
        var request = `query getRepositories {
            repositories {
                id
                name
                description
                created_at
                clone_url
            }
        }`;
        axios({
            url: URL,
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: {query: request }
        }).then(res => {
            this.setState({
                data: res.data,
                loading: false,
                error: false
            });
        }).catch(error => {
            this.setState({
                error: `${error}`,
                loading: false
            });
        });
    };


    componentDidMount() {
        this.loadData();
    }

    render() {
        const { loading, data } = this.state;
        if (loading) {
            return <p>Loading ...</p>;
        }
        return (
            <div>
                <table className={"striped bordered hover"}>
                    <thead>
                    <tr>
                        <th colSpan="2">BAM repositories</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.data.repositories.map((repo) => {
                            return <tr key={repo.id}>
                                    <td>{repo.name}</td>
                                    <td>{repo.description}</td>
                                </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
