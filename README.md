# github page 적용하기

### 배포

**Github Actions**을 적용하여 push 하기만 하면 된다.

```
git commit -am 'commitm message'
git push origin main
```

---

### 수동배포

```
npm run build
copy build/index.html build/404.html
```

_postbuild 명령어 중 copy가 작동하지 않음_

```
git add .
git commit -m 'commit message'
git push origin main
git subtree push --prefix build/ origin gh-pages
```
