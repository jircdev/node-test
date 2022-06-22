import { Col, Row } from "antd";
import React from "react";
import { ImgCard } from "./ImgCard";
import "./card-grid.scss";

export const CardGrid = ({ images }) => {
	return (
		<Row gutter={[24, 24]} justify='space-around' className='row-card'>
			{images?.map(({ id, name, userId, image }) => (
				<Col
					key={id}
					xs={24}
					sm={18}
					md={12}
					lg={8}
					xl={4}
					style={{ display: "flex", justifyContent: "center" }}
				>
					<ImgCard id={id} userName={name} userId={userId} image={image} />
				</Col>
			))}
		</Row>
	);
};
