import React, { useCallback} from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@material-ui/core/TableCell';
import useBlogInfo from '../../hooks/blogs'
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
  {id: 'title', value: 'Blog'},
  {id: 'updatedAt', value: 'Date'},
  {id: 'author', value: 'Author'},
  {id: 'link', value: 'Medium Link'}
];

const RowComponent = ({ title, updatedAt, author, link }) => (
  <>
    <TableCell>
      <TextBold>{title}</TextBold>
    </TableCell>
    <TableCell>{updatedAt}</TableCell>
    <TableCell>{author}</TableCell>
    <TableCell>
      <LinkButton as="a" href={link}>Link</LinkButton>
    </TableCell>
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
    summary: blog.summary
  }));

  const addBlog = useCallback(() => {
    history.push('/blog/add');
  }, [history]);

  const onEditBlog = useCallback(
    (id) => {
      history.push(`/blog/${id}`);
    },
    [history],
  );

  return (
    <Container>
      <TableLabelHeader>
        <TableHeader>Blogs</TableHeader>
        <Button label="New Blog +" onClick={addBlog} />
      </TableLabelHeader>
      {(blogInfo && blogInfo.success === 'Y') ?
      <PreviewTable
        headers={headers}
        RowComponent={RowComponent}
        rows={blogs}
        onEdit={onEditBlog}
      />
      : <TextBold>Sorry, there was an error displaying the blogs</TextBold>
      }
    </Container>
  );
};

export default BlogPage;
