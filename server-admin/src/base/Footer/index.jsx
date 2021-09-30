import styles from './style.less';
import { Layout } from 'antd';
const { Footer } = Layout;
export default (props) => {
    return (
        <Footer className={styles.footerBox}>Copyright © 2021 九五三 渝ICP备18007185号-1 渝公网安备 50011402500365号</Footer>
    );
};
