param (
  [string]$m = "misc changes"
)
Write-Host "Started merging to master " + $m

git add .
git commit -m $m
git push origin development

git checkout master
git merge development
git push origin master
git checkout development
git rebase master