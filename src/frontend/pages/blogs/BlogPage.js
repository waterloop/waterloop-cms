import React, { useCallback } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@mui/material/TableCell';
import useBlogInfo from '../../hooks/blogs';
import { useHistory } from 'react-router-dom';

const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;

const TextBold = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const TableLabelHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 0;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const LinkButton = styled.button`
  color: black;
  text-decoration: none;
`;

const TableHeader = styled.p`
  font: ${({ theme }) => theme.fonts.bold36};
  margin: 10px;
`;

const headers = [
  { id: 'title', value: 'Title' },
  { id: 'updatedAt', value: 'Date' },
  { id: 'author', value: 'Author' },
  { id: 'category', value: 'Category' },
  { id: 'visibility', value: 'Visibility' },
];

const RowComponent = ({
  title,
  updatedAt,
  author,
  link,
  category,
  visibility,
}) => (
  <>
    <TableCell>
      <TextBold>
        <LinkButton as="a" href={link} target="_blank">
          {title}
        </LinkButton>
      </TextBold>
    </TableCell>
    <TableCell>{updatedAt}</TableCell>
    <TableCell>{author}</TableCell>
    <TableCell>{category}</TableCell>
    <TableCell>{visibility}</TableCell>
  </>
);

const BlogPage = () => {
  let { blogInfo } = useBlogInfo();
  const history = useHistory();

  const blogs = blogInfo?.posts?.map((blog) => ({
    id: blog.id,
    title: blog.title,
    author: blog.author,
    updatedAt: blog.date,
    link: blog.link,
    summary: blog.summary,
    content: blog.content,
    visibility: blog.visibility,
    category: blog.category,
  }));

  const addBlog = useCallback(() => {
    history.push('/blog-posts/add');
  }, [history]);

  const onEditBlog = useCallback(
    (id) => {
      history.push(`/blog-posts/${id}`);
    },
    [history],
  );

  return (
    <Container>
      <TableLabelHeader>
        <TableHeader>Blogs</TableHeader>
        <Button label="New Blog +" onClick={addBlog} />
      </TableLabelHeader>
      {blogInfo && blogInfo.success === 'Y' ? (
        <PreviewTable
          headers={headers}
          RowComponent={RowComponent}
          rows={blogs}
          onEdit={onEditBlog}
        />
      ) : (
        <TextBold>Sorry, there was an error displaying the blogs</TextBold>
      )}
    </Container>
  );
};

export default BlogPage;
