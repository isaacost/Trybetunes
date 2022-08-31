import React from 'react';
import { Link } from 'react-router-dom';
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
              <div>
                <h2 data-testid="header-user-name">
                  {`Bem-vinda ${nome}!`}
                </h2>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <br />
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <br />
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
