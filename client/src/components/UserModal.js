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
            warningUsername: false,
            isOpen: false,
            status: 'Active',
            email: '',
            username: ''
        };

        // binding functions
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // resets state to natural values, toggles isOpen for Modal
    toggle = () => {
        this.setState(state => ({
            isOpen: !state.isOpen,
            warningUsername: false,
            warningEmail: false,
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

        if (!this.state.username || hasWhitespace(this.state.username)) {
            this.setState(state => ({
                warningUsername: true
            }));
        } else if (!validateEmail(this.state.email)) {
            this.setState({
                warningEmail: true
            });
        } else {
            this.props.addUser({
                username: this.state.username,
                status: this.state.status,
                email: this.state.email.toLowerCase()
            });
            this.toggle();
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
                                isOpen={this.state.warningUsername}
                                toggle={() => {
                                    this.setState({ warningUsername: false });
                                }}
                            >
                                Please input a username without spaces
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
                            <Alert
                                color="danger"
                                isOpen={this.state.warningEmail}
                                toggle={() => {
                                    this.setState({ warningEmail: false });
                                }}
                            >
                                Please input a valid email address
                            </Alert>
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

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// returns true if whitespace is detected
const hasWhitespace = string => {
    if (string.indexOf(' ') !== -1) {
        return true;
    }
    return false;
};

export default connect(null, { addUser })(UserModal);
