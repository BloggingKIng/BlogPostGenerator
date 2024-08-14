import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLogin } from "../loginContext";
import axios from "axios";
import './blogform.css';


export default function BlogGenerationForm() {
    const [blogTitle, setBlogTitle] = useState("");
    const [sections, setSections] = useState(1);
    const [sectionsData, setSectionsData] = useState([]);
    const [blogDescription, setBlogDescription] = useState("");
    const [resultHtml, setResultHtml] = useState("");
    const {isLogin, setIsLogin, setToken, token} = useLogin()

    useEffect(() => {
        if (sections > sectionsData.length) {
            setSectionsData(prevSectionsData => [...prevSectionsData, { heading: "", type: "", subSectionsNum: 0, subSections: [] }]);
        }
        if (sections < sectionsData.length) {
            setSectionsData(prevSectionsData => prevSectionsData.slice(0, sections));
        }
    }, [sections]);

    const handleChange = (sectionIndex, heading, type, subSectionsNum) => {
        setSectionsData(prevSectionsData => {
            const newSectionsData = [...prevSectionsData];
            const section = { ...newSectionsData[sectionIndex] };
            section.heading = heading;
            section.type = type;
            section.subSectionsNum = subSectionsNum;
            const newSubSections = [...section.subSections];
            if (subSectionsNum > newSubSections.length) {
                newSubSections.push(...Array(subSectionsNum - newSubSections.length).fill(""));
            } else {
                newSubSections.splice(subSectionsNum);
            }
            section.subSections = newSubSections;
            newSectionsData[sectionIndex] = section;
            return newSectionsData;
        });
    };
    

    const handleChangeSubSection = (sectionIndex, subSectionIndex, subSection) => {
        const newSectionsData = [...sectionsData];
        const section = { ...newSectionsData[sectionIndex] };
        const newSubSections = [...section.subSections];
        newSubSections[subSectionIndex] = subSection;
        section.subSections = newSubSections;
        newSectionsData[sectionIndex] = section;
        setSectionsData(newSectionsData);
    };

    const handleGenerate = async() => {
        console.log(sectionsData);
        const processedData = []
        for (let data of sectionsData) {
            processedData.push({
                heading: [data.heading, data.headingType],
                subheadings: data.subSections.map(subSection => [subSection, "h3 or h4"]),
                info:''
            })
        }
        await 
            axios.post('http://127.0.0.1:8000/api/get-blog-post/', 
                {title: blogTitle, sections: processedData, info: blogDescription}
            )
            .then((response) => {
                setResultHtml(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (!isLogin) {
        return(<Container style={{marginTop:'50px'}}>
            <h1 className="text-center hd">Please login before continuing!</h1>
        </Container>)
    }

    if (resultHtml !== "") {
        return (
            <Container className="content-container">
                <Container>
                    <h1 className="text-center hd">AI Blog Writer</h1>
                    <p className="text-center hd-desc">
                        Give us the outline of your blog post, and we will write it for you.
                    </p>
                </Container>
                <hr />
                <Container className="result-container">
                    <div dangerouslySetInnerHTML={{ __html: resultHtml.blog_post }} />
                </Container>
                <Container style={{display:'flex', justifyContent:'center', marginBottom:'30px'}}>
                    <Button variant="secondary" size="lg" onClick={() => window.location.reload()}>Write a new post!</Button>
                </Container>
            </Container>
        )
    }


    return (
        <Container className="content-container">
            <Container>
                <h1 className="text-center hd">AI Blog Writer</h1>
                <p className="text-center hd-desc">
                    Give us the outline of your blog post, and we will write it for you.
                </p>
            </Container>
            <Container className="form-container">
                <Form className="blog-form">
                    <Form.Group className="mb-3 form-g" controlId="blogTitle">
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            placeholder="Enter the blog title!"
                            required
                        />
                        {blogTitle !== "" && 
                            (
                                <Container className="mt-3" style={{margin:'0', padding:'0'}}>
                                    <Form.Label>Info: </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Give the AI writer some instructions if you want!"  
                                        value={blogDescription}
                                        onChange={(e) => setBlogDescription(e.target.value)}
                                    />
                                </Container>
                            )
                        }
                    </Form.Group>
                    {blogTitle !== "" && (
                        <Container>
                            <Form.Group className="mb-3 form-g">
                                <Form.Label>How many sections do you want?</Form.Label>
                                <Container className="range-container">
                                    <Form.Range type="number" min="1" max="5" value={sections} onChange={(e) => setSections(e.target.value)} list="values" />
                                    <Form.Control type="number" value={sections} disabled id="sections" />
                                </Container>
                            </Form.Group>

                            <hr />
                            <h2 className="text-center">Sections</h2>
                            <hr />

                            {sectionsData.map((section, i) => (
                                <Container key={i}>
                                    <hr />
                                    <Form.Group className="mb-3 form-g">
                                        <Form.Label htmlFor={`sec-${i + 1}-heading`}>
                                            Section {i + 1}.
                                        </Form.Label>
                                        <Container className="sections-detail-container">
                                            <Form.Control
                                                type="text"
                                                placeholder={`Section ${i + 1} heading`}
                                                id={`sec-${i + 1}-heading`}
                                                value={section.heading}
                                                onChange={(e) =>
                                                    handleChange(i, e.target.value, section.type, section.subSectionsNum)
                                                }
                                                required
                                            />
                                            <Form.Select
                                                id={`sec-${i + 1}-type`}
                                                value={section.type}
                                                onChange={(e) =>
                                                    handleChange(i, section.heading, e.target.value, section.subSectionsNum)
                                                }
                                            >
                                                <option value="h1">h1</option>
                                                <option value="h2">h2</option>
                                            </Form.Select>
                                        </Container>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-g">
                                        <Form.Label htmlFor={`sub-sec-${i + 1}`}>
                                            Number of sub-sections
                                        </Form.Label>
                                        <Container className="range-container">
                                            <Form.Range
                                                type="number"
                                                min="0"
                                                max="5"
                                                value={section.subSectionsNum}
                                                onChange={(e) =>
                                                    handleChange(i, section.heading, section.type, e.target.value)
                                                }
                                            />
                                            <Form.Control
                                                type="number"
                                                disabled
                                                id={`sub-sec-${i + 1}`}
                                                value={section.subSectionsNum}
                                                className="sub-secs-range"
                                            />
                                        </Container>
                                    </Form.Group>
                                    {Array.from({ length: section.subSectionsNum }, (_, j) => (
                                        <Container>
                                            <Form.Group className="mb-3 form-g form-sub" key={j}>
                                                <Form.Label htmlFor={`sub-sec-${j + 1}`} className="sub-sec-label">
                                                    Sub-Section {j + 1}
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Sub-Section heading"
                                                    id={`sub-sec-${j + 1}`}
                                                    value={section.subSections[j] || ""}
                                                    onChange={(e) => handleChangeSubSection(i, j, e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Container>
                                    ))}
                                    <hr />
                                </Container>
                            ))}
                        </Container>
                    )}
                </Form>
                {
                    blogTitle !== "" && (
                        <Container type="submit" className="text-center" style={{marginTop:'-30px', marginBottom:'30px'}}>
                            <Button
                                variant="primary"
                                onClick={handleGenerate}
                            >
                                Generate
                            </Button>
                        </Container>
                    )
                }
            </Container>
        </Container>
    );
}
