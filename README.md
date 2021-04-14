## ssho-admin-ssr
- 스와이프 쇼핑 <스쇼> 어드민 웹 SSR 버전
- 이전 프로젝트
  - https://github.com/ssho-lab/ssho-admin-web
  
#### 사용 기술
 - Next.js
 - Recoil
 - TypeScript
 
 
#### Next.js
- Data Fetching Functions
   - `getStaticProps`
      - 빌드 타임에 data fetch
   - `getServerSideProps` 
      - 요청시마다 data fetch
      
- getStaticProps
    ```javascript
    export async function getStaticProps(context) {
      return {
        props: {}, // will be passed to the page component as props
      }
    }    
    ```
   - Next.js가 빌드 타임에 getStaticProps가 return 하는 props를 가지고 페이지를 렌더링 함
   - context 파라미터
      - params
        - dynamic routes를 가지고 있는 페이지의 경로 파라미터 값을 포함함
        
    - getStaticProps를 사용해야할 경우
       - 유저의 요청 이전(빌드 타임)에 페이지가 필수적으로 렌더링 되어야 하는 경우
       - headless CMS로 부터 데이터가 오는 경우
       - 퍼블릭하게 캐싱될수 있는 데이터인 경우
       - SEO를 위해 pre-rendered 되어야 하고, 그것도 빠르게 되어야 하는 경우
          - CDN을 통해 캐싱될 수 있는 HTML, JSON 파일을 생성함
