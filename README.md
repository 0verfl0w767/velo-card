# velo-card

<p align="center">
  <img src="./public/banner.gif" alt="velo-card 미리보기" width="760" />
</p>

[velog.io](https://velog.io) 사용자 이름만 넣으면 **프로필 + 게시글**을 SVG 카드로 그려주는 API입니다.
GitHub README, 블로그 등 어디든 이미지처럼 붙여 넣을 수 있습니다.

## 동작 방식

- velog 공개 GraphQL API(`https://v3.velog.io/graphql`)에서 `user`(팔로워/팔로잉 포함), `posts`, `userTags` 를 한 번에 조회합니다.
- GitHub는 SVG 안의 외부 이미지를 차단하므로 프로필 사진과 썸네일은 base64로 인라인합니다.
  용량을 줄이기 위해 [wsrv.nl](https://wsrv.nl) 로 리사이즈한 뒤 넣고, 실패하면 원본을 사용합니다.
- 썸네일이 없는 글은 테마 색 기반의 플레이스홀더가 표시됩니다.
