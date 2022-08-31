import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_LENGTH = 3;

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
    logado: false,
  };

  getName = (event) => {
    const { value } = event.target;
    this.setState({
      nome: value,
    });
  };

  activateBtn = () => {
    const { nome } = this.state;
    return nome.length < MIN_LENGTH;
  };

  handleClick = async () => {
    const { nome } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: nome });
    this.setState({
      loading: false,
      logado: true,
    });
  };

  render() {
    const { nome, loading, logado } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading
            ? (<Loading />)
            : (
              <div>
                <label htmlFor="name-input">
                  Nome:
                  <input
                    type="text"
                    data-testid="login-name-input"
                    id="name-input"
                    value={ nome }
                    onChange={ this.getName }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                  disabled={ this.activateBtn() }
                >
                  Entrar
                </button>
              </div>
            )
        }
        {logado && (
          <Redirect to="/search" />
        )}
      </div>
    );
  }
}

export default Login;
