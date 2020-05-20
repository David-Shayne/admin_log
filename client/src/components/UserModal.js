import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import { addUser } from '../actions/userActions';

export class UserModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            warning: false,
            isOpen: false,
            status: 'Active',
            email: '',
            username: ''
        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    toggle = () => {
        this.setState(state => ({
            isOpen: !state.isOpen,
            warning: false,
            username: '',
            status: 'Active',
            email: ''
        }));
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit(e) {
        e.preventDefault();

        if (this.state.username) {
            this.props.addUser({
                username: this.state.username,
                status: this.state.status,
                email: this.state.email
            });
            this.toggle();
        } else {
            this.setState(state => ({
                warning: true
            }));
        }
    }

    render() {
        return (
            <Container>
                <Button color="dark" onClick={this.toggle}>
                    Add User
                </Button>

                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add a new User
                    </ModalHeader>

                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for="username">Username:</Label>
                                <Input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChange}
                                    value={this.state.username}
                                />
                            </FormGroup>
                            <Alert
                                color="danger"
                                isOpen={this.state.warning}
                                toggle={() => {
                                    this.setState({ warning: false });
                                }}
                            >
                                Error: Please add a username
                            </Alert>
                            <FormGroup>
                                <Label for="email">Email:</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status:</Label>
                                <Input
                                    name="status"
                                    type="select"
                                    className="form-control"
                                    onChange={this.onChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    type="submit"
                                    color="success"
                                    className="form-control"
                                    style={{
                                        width: '50%',
                                        marginTop: '1em',
                                        fontSize: '110%'
                                    }}
                                    onClick={this.submit}
                                >
                                    Submit
                                </Button>
                            </FormGroup>
                        </ModalBody>
                    </Form>
                </Modal>
            </Container>
        );
    }
}

export default connect(null, { addUser })(UserModal);
