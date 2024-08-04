import { Container, Form } from "react-bootstrap"
import './blogform.css'

export default function BlogGenerationForm() {
    return (
        <Container className="content-container">
            <Container>
                <h1 className="text-center hd">AI Blog Writer</h1>
                <p className="text-center hd-desc">
                    Give us the outline of your blog post and we will write it for you.
                </p>
            </Container>
            <Container className="form-container">
                <Form className="blog-form">
                    <Form.Group className="mb-3 form-g" controlId="blogTitle">
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter the blog title! "/>
                    </Form.Group>
                </Form>
            </Container>
        </Container>
    )
}