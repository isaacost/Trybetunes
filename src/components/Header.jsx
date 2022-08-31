import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    nome: '',
    loading: false,
  };

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({
      loading: true,
    });
    const resposta = await getUser();
    this.setState({
      nome: resposta.name,
      loading: false,
    });
  };

  render() {
    const { nome, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? (<Loading />)
            : (
              <h2 data-testid="header-user-name">
                {`Bem-vinda ${nome}!`}
              </h2>
            )
        }
      </header>
    );
  }
}

export default Header;
