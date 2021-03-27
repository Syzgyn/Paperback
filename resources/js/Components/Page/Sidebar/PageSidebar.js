import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { icons } from "@/Helpers/Props";
import locationShape from "@/Helpers/Props/Shapes/locationShape";
import PageSidebarItem from "@/Components/Page/Sidebar/PageSidebarItem";
import styles from "./PageSidebar.module.scss";

const links = [
  {
    iconName: icons.SERIES_CONTINUING,
    title: 'Series',
    to: '/',
    alias: '/series',
    children: [
      {
        title: 'Add New',
        to: '/add/new'
      },
      {
        title: 'Library Import',
        to: '/add/import'
      },
      {
        title: 'Mass Editor',
        to: '/serieseditor'
      },
      {
        title: 'Season Pass',
        to: '/seasonpass'
      }
    ]
  },

  {
    iconName: icons.CALENDAR,
    title: 'Calendar',
    to: '/calendar'
  },

  {
    iconName: icons.ACTIVITY,
    title: 'Activity',
    to: '/activity/queue',
    children: [
      {
        title: 'Queue',
        to: '/activity/queue',
//        statusComponent: QueueStatusConnector
      },
      {
        title: 'History',
        to: '/activity/history'
      },
      {
        title: 'Blacklist',
        to: '/activity/blacklist'
      }
    ]
  },

  {
    iconName: icons.WARNING,
    title: 'Wanted',
    to: '/wanted/missing',
    children: [
      {
        title: 'Missing',
        to: '/wanted/missing'
      },
      {
        title: 'Cutoff Unmet',
        to: '/wanted/cutoffunmet'
      }
    ]
  },

  {
    iconName: icons.SETTINGS,
    title: 'Settings',
    to: '/settings',
    children: [
      {
        title: 'Media Management',
        to: '/settings/mediamanagement'
      },
      {
        title: 'Profiles',
        to: '/settings/profiles'
      },
      {
        title: 'Quality',
        to: '/settings/quality'
      },
      {
        title: 'Indexers',
        to: '/settings/indexers'
      },
      {
        title: 'Download Clients',
        to: '/settings/downloadclients'
      },
      {
        title: 'Import Lists',
        to: '/settings/importlists'
      },
      {
        title: 'Connect',
        to: '/settings/connect'
      },
      {
        title: 'Metadata',
        to: '/settings/metadata'
      },
      {
        title: 'Tags',
        to: '/settings/tags'
      },
      {
        title: 'General',
        to: '/settings/general'
      },
      {
        title: 'UI',
        to: '/settings/ui'
      }
    ]
  },

  {
    iconName: icons.SYSTEM,
    title: 'System',
    to: '/system/status',
    children: [
      {
        title: 'Status',
        to: '/system/status',
//        statusComponent: HealthStatusConnector
      },
      {
        title: 'Tasks',
        to: '/system/tasks'
      },
      {
        title: 'Backup',
        to: '/system/backup'
      },
      {
        title: 'Updates',
        to: '/system/updates'
      },
      {
        title: 'Events',
        to: '/system/events'
      },
      {
        title: 'Log Files',
        to: '/system/logs/files'
      }
    ]
  }
];

function getActiveParent(pathname) {
  let activeParent = links[0].to;

  links.forEach((link) => {
    if (link.to && link.to === pathname) {
      activeParent = link.to;

      return false;
    }

    const children = link.children;

    if (children) {
      children.forEach((childLink) => {
        if (pathname.startsWith(childLink.to)) {
          activeParent = link.to;

          return false;
        }
      });
    }

    if (
      (link.to !== '/' && pathname.startsWith(link.to)) ||
      (link.alias && pathname.startsWith(link.alias))
    ) {
      activeParent = link.to;

      return false;
    }
  });

  return activeParent;
}

function hasActiveChildLink(link, pathname) {
  const children = link.children;

  if (!children || !children.length) {
    return false;
  }

  return _.some(children, (child) => {
    return child.to === pathname;
  });
}

const PageSidebar = (props) => {
	const onItemPress = () => {
		//props.onSidebarVisibleChange(false);
	}
    const pathname = location.pathname;
    const activeParent = getActiveParent(pathname);

    return (
        <div
            className={styles.sidebarContainer}
        >
			<div className={styles.sidebar}>
				<div>
					{
						links.map((link) => {
							const childWithStatusComponent = _.find(link.children, (child) => {
								return !!child.statusComponent;
							});

							const childStatusComponent = childWithStatusComponent ?
								childWithStatusComponent.statusComponent :
								null;

							const isActiveParent = activeParent === link.to;
							const hasActiveChild = hasActiveChildLink(link, pathname);

							return (
								<PageSidebarItem
									key={link.to}
									iconName={link.iconName}
									title={link.title}
									to={link.to}
									statusComponent={isActiveParent || !childStatusComponent ? link.statusComponent : childStatusComponent}
									isActive={pathname === link.to && !hasActiveChild}
									isActiveParent={isActiveParent}
									isParentItem={!!link.children}
									onPress={onItemPress}
								>
									{
										link.children && link.to === activeParent &&
											link.children.map((child) => {
												return (
													<PageSidebarItem
														key={child.to}
														title={child.title}
														to={child.to}
														isActive={pathname.startsWith(child.to)}
														isParentItem={false}
														isChildItem={true}
														statusComponent={child.statusComponent}
														onPress={onItemPress}
													/>
												);
											})
									}
								</PageSidebarItem>
							);
						})
					}
				</div>
        	</div>
        </div>
    );
};

PageSidebar.propTypes = {
  location: locationShape,
  isSmallScreen: PropTypes.bool,
  isSidebarVisible: PropTypes.bool,
  onSidebarVisibleChange: PropTypes.func
};

export default PageSidebar;
