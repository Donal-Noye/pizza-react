import React, {FC} from 'react';
import styles  from './NotFoundBlock.module.scss'

const Index: FC = () => {
	return (
		<h1 className={styles.root}>
			Ничего не найдено :(
		</h1>
	);
}

export default Index;