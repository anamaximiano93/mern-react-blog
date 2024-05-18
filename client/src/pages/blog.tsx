import React, { useContext, useEffect, useState } from "react";
import IPageProps from "../interfaces/pages";
import {
  Link,
  Redirect,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import UserContext from "../contexts/user";
import axios from "axios";
import config from "../config/config";
import IBlog from "../interfaces/blog";
import LoadingComponent, { Loading } from "../components/Loading";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Navigation from "../components/Navigation";
import ErrorText from "../components/ErrorText";
import Header from "../components/Header";
import IUser from "../interfaces/user";

const BlogPage: React.FunctionComponent<
  IPageProps & RouteComponentProps<any>
> = (props) => {
  const [_id, setId] = useState<string>("");
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const { user } = useContext(UserContext).userState;
  const history = useHistory();

  useEffect(() => {
    let _blogID = props.match.params.blogID;

    if (_blogID) {
      setId(_blogID);
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (_id !== "") getBlog();

    // eslint-disable-next-line
  }, [_id]);

  const getBlog = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.server.url}/blogs/read/${_id}`,
      });

      if (response.status === 200 || 304) {
        setBlog(response.data.blog);
      } else {
        setError(`Unable to retrieve blog ${_id}`);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const deleteBlog = async () => {
    setDeleting(true);
    try {
      const response = await axios({
        method: "DELETE",
        url: `${config.server.url}/blogs/read/${_id}`,
      });

      if (response.status === 200) {
        setTimeout(() => {
          history.push("/");
        }, 1000);
      } else {
        setError(`Unable to delete blog ${_id}`);
        setDeleting(false);
      }
    } catch (error) {
      setError(error as string);
      setDeleting(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent>Loading Blog ...</LoadingComponent>;

  if (blog) {
    return (
      <Container fluid className="p-0">
        <Navigation />
        <Modal isOpen={modal}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            {deleting ? <Loading /> : "Tem certeza do que se quer?"}
            <ErrorText error={error} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => deleteBlog()}>
              Delete Permanently
            </Button>
            <Button color="secundary" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Header
          image={blog.picture || undefined}
          headline={blog.headline}
          title={blog.title}
        >
          <p className="text-white">
            Posted by {(blog.author as IUser).name} on{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </Header>
        <Container className="mt-5">
          {user._id === (blog.author as IUser)._id && (
            <Container fluid className="p-0">
              <Button
                color="info"
                className="mr-2"
                tag={Link}
                to={`/edit/${blog._id}`}
              >
                <i className="fas fa-edit mr-2"></i> Edit
              </Button>
              <Button color="danger" onClick={() => setModal(true)}>
                <i className="fas fa-trash-alt mr-2"></i> Delete
              </Button>
              <hr />
            </Container>
          )}
          <ErrorText error={error} />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Container>
      </Container>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default BlogPage;
