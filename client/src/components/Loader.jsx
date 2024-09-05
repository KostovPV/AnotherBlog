import LoadingGif from '../images/LoadingGif.gif';

export default function Loader() {
  return (
    <div className='loader'>
        <div className="loader__image">
            <img src={LoadingGif} alt="loading-image" />
        </div>

    </div>
  )
}
