
export class GlobalConstants {
    public static links: {
        newsCategory: string, newsSubCategory: string,
        newsMedia: string, newsComment: string, viewMedia: string,
        chatPrivate: string, chatRoom: string, requestCategory: string,
        jobCategory: string, jobSubCategory: string,jobState:string
    } = {
        newsComment: '/admin/news-comment/list',
        newsMedia: '/admin/news-media/list',
        newsCategory: '/admin/news-category/list',
        newsSubCategory: '/admin/news-sub-category/list',
        viewMedia: '/admin/view-media/list',
        chatPrivate: '/admin/chat/private',
        chatRoom: '/admin/chat/room',
        requestCategory: '/admin/request-category/list',
        jobCategory: '/admin/job-category/list',
        jobSubCategory: '/admin/job-sub-category/list',
        jobState: '/admin/job-state/list',

    };

    public static limitUserMenu: {
        [key: string]: string[]
    } = {
        account: ['user','graph','user', 'permission','permissionUser','permissionGroup'],
        dashboard: ['overView','graph'],
    };

}
