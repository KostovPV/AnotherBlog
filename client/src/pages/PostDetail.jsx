import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import Thumbnail from '../images/blog18.jpg'

export default function PostDetail() {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/asas/edit`} className="btn sm primary">Edit</Link>
            <Link to={`/posts/asas/delete`} className="btn sm danger">Delete</Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="thumbnail-image" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum sint dolores
          dolorum cumque ipsam culpa deleniti fugiat iusto, commodi corporis odit a laborum,
          optio dolor minus fuga reiciendis
          voluptate repudiandae eaque quae reprehenderit impedit nihil doloremque. Doloremque eligendi at optio.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error necessitatibus
          ipsa repudiandae quae nostrum, veniam illo deserunt impedit ex accusamus dolorum
          ratione excepturi tempora, voluptatum sit laboriosam quas facilis quia molestiae natus?
          Quam obcaecati repellat placeat mollitia, in ratione praesentium veritatis?
          Voluptatum expedita officiis suscipit, repellat officia aperiam, amet ducimus
          enim eveniet tempora, facere aliquid?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, veritatis vero maiores
          voluptates consectetur vel ratione? Consequuntur eum temporibus corporis vitae laboriosam.
          Impedit cumque cum ab nemo hic dicta soluta sint cupiditate ipsum dolore maiores eligendi,
          voluptatem pariatur? Consequuntur eligendi excepturi qui impedit itaque perferendis eius
          necessitatibus labore facere, at incidunt a totam ab maiores animi et veniam velit provident,
          repellendus odio doloribus quia? Praesentium animi incidunt autem molestiae ipsam minima
          perspiciatis nemo reiciendis delectus quis iste itaque veritatis natus accusantium,
          facilis eligendi optio. Ut labore vitae aspernatur iusto eveniet provident quia cum eum
          perspiciatis, quis, magnam voluptatem quaerat ipsum, repellendus voluptas temporibus?
          Cumque, animi provident! Recusandae repudiandae, eaque optio doloremque harum aliquam,
          placeat, iusto nihil sed magni tempora nisi?
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab eligendi consectetur laudantium
          corporis distinctio, aperiam odio assumenda repudiandae numquam similique.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aut nemo nesciunt distinctio dicta sequi corporis quod consectetur, recusandae nam. Libero cupiditate modi corrupti enim tempora harum debitis deserunt labore unde cum suscipit blanditiis mollitia praesentium quibusdam soluta, nostrum necessitatibus at fugiat a excepturi, consectetur neque ratione? Reiciendis perspiciatis quasi voluptatum itaque iusto est facere voluptatibus sequi dicta, iste, illo consequuntur doloribus alias vitae. Eveniet quae architecto, saepe iste, minus adipisci excepturi doloribus optio repellat, nulla at dignissimos enim ipsum est nostrum a rerum corporis. Facere provident cumque minus earum explicabo alias, praesentium sit omnis, sapiente, similique eveniet voluptatum sequi reiciendis delectus iste corporis nostrum quas officia doloribus temporibus totam accusantium libero? Culpa cumque nobis doloremque sequi quaerat, enim dignissimos aut molestias ut! Voluptatum quibusdam, minima explicabo deserunt temporibus quae suscipit? Accusamus hic at qui rem quaerat quis dolore ducimus nemo, alias ut quisquam temporibus saepe vel ex beatae odio quos maxime repellat cupiditate corrupti iste nisi perspiciatis libero nobis. Incidunt, quisquam? Sit nulla natus inventore assumenda recusandae distinctio eius fugiat officia animi quod tempore expedita pariatur ducimus impedit nemo esse, quam ex dignissimos? Distinctio aperiam temporibus iure enim voluptatum, facere praesentium dolor aspernatur dolore veritatis maxime, fuga provident quisquam?
        </p>
      </div>

    </section>
  )
}
