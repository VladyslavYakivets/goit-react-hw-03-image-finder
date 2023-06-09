import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { getSearchImage } from 'api/Api';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searhQuerry: '',
    pictures: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImgUrl: '',
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.searhQuerry !== this.state.searhQuerry ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
      });
      getSearchImage(this.state.searhQuerry, this.state.page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            alert('Enter the correct data for the request');
          }
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...hits],
          }));
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }
  nextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  handleFormSubmit = searhQuerry => {
      this.setState({
        page: 1,
        pictures: [],
        searhQuerry,
      });
  };

  showModal = modalImgUrl => {
    this.setState({
      modalImgUrl,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <div className="App">
        <SearchBar
          onSubmit={this.handleFormSubmit}
          resetPage={this.state.page}
          clearPictures={this.state.pictures}
        />
        <ImageGallery images={this.state.pictures} showModal={this.showModal} />
        <Loader visible={this.state.isLoading} />
        {this.state.pictures.length > 0 && !this.state.isLoading && (
          <Button onClick={this.nextPage} />
        )}
        {this.state.showModal && (
          <Modal
            modalImgUrl={this.state.modalImgUrl}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
