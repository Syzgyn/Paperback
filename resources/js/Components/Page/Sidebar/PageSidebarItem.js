import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "@/Components/Link/Link";
import classNames from "classnames";
import Icon from "@/Components/Icon";
import styles from "./PageSidebarItem.module.scss";

const PageSidebarItem = (props) => {
    const onPress = () => {
        const {
            isChildItem,
            isParentItem,
            onPress
        } = props;

        if (isChildItem || !isParentItem) {
            onPress();
        }
    }

    const {
        iconName,
        title,
        to,
        isActive,
        isActiveParent,
        isChildItem,
        statusComponent,
        children
    } = props;

    return (
        <div
            className={classNames(
                styles.item,
                isActiveParent && styles.isActiveItem
            )}
        >
            <Link
                className={classNames(
                    isChildItem ? styles.childLink : styles.link,
                    isActiveParent && styles.isActiveParentLink,
                    isActive && styles.isActiveLink
                )}
                to={to}
                onPress={onPress}
            >
                {
                    !!iconName &&
                    <span className={styles.iconContainer}>
                        <Icon
                            name={iconName}
                        />
                    </span>
                }

                <span className={isChildItem ? styles.noIcon : null}>
                    {title}
                </span>
            </Link>

            {
                children &&
                children.map((child) => {
                    return React.cloneElement(child, { isChildItem: true });
                })
            }
        </div>
    );
};

PageSidebarItem.propTypes = {
	iconName: PropTypes.object,
	title: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	isActiveParent: PropTypes.bool,
	isParentItem: PropTypes.bool.isRequired,
	isChildItem: PropTypes.bool.isRequired,
	statusComponent: PropTypes.elementType,
	children: PropTypes.node,
	onPress: PropTypes.func
};

PageSidebarItem.defaultProps = {
	isChildItem: false
};

export default PageSidebarItem;
