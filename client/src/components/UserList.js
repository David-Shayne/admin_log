import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Table, Spinner } from 'reactstrap';
import { getUsers, deleteUser } from '../actions/userActions';

export class UserList extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { users } = this.props.userState;

        const list = users.map(user => (
            <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user._id}</td>
                <td>
                    <Button
                        onClick={() => {
                            this.props.deleteUser(user._id);
                        }}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

        return (
            <Container>
                <Table style={{ marginTop: '1em' }} className="table-dark">
                    <Spinner
                        hidden={!this.props.loading}
                        style={{ margin: '1em' }}
                    />
                    <thead className="thead">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">ID</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>

                    <tbody>{list}</tbody>
                </Table>
            </Container>
        );
    }
}

const mapStoreToProps = store => ({
    userState: store.userState,
    loading: store.userState.loading
});

export default connect(mapStoreToProps, { getUsers, deleteUser })(UserList);
