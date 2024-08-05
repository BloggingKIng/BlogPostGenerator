import { useState } from "react"
import { Container, Form } from "react-bootstrap"
import './blogform.css'

export default function BlogGenerationForm() {

    const [blogTitle, setBlogTitle] = useState("")
    const [sections, setSections] = useState(1)
    const [sectionsData , setSectionsData] = useState([])

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
                        <Form.Control type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder="Enter the blog title! "/>
                    </Form.Group>
                    {
                        blogTitle !== ""  && (
                            <Container>
                                <Form.Group className="mb-3 form-g" controlId="blogContent">
                                    <Form.Label>How many sections do you want?</Form.Label>
                                    <Container className="range-container">
                                        <Form.Range type="number" min="1" max="5" value={sections} onChange={(e) => setSections(e.target.value)} list="values"/>
                                        <Form.Control type="number" value={sections} disabled id="sections" /> 
                                    </Container>
                                </Form.Group>

                                <hr />
                                <h2 className="text-center">Sections</h2>
                                <hr />
                                
                                <Container>
                                    <Form.Group className="mb-3 form-g" controlId="sections">
                                        <Form.Label for="sec-1-heading">Section 1.</Form.Label>
                                        <Container className="sections-detail-container">
                                            <Form.Control type="text" placeholder="Section 1 heading" id="sec-1-heading" />
                                            <Form.Select id="sec-1-type">
                                                <option value="h1">h1</option>
                                                <option value="h2">h2</option>
                                            </Form.Select>
                                        </Container>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-g" controlId="sub-section-1">
                                        <Form.Label for="sub-sec-1">
                                            Number of sub-sections
                                        </Form.Label>
                                        <Container className="range-container">
                                            <Form.Range type="number" min="0" max="5" />
                                            <Form.Control type="number" disabled id="sub-sec-1" value={2} className="sub-secs-range" />
                                        </Container>
                                    </Form.Group>

                                </Container>
                                
                            </Container>
                        )
                    }
                </Form>
            </Container>
        </Container>
    )
}