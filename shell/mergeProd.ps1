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

cd Client

git add .
git commit -m $m
git push origin master

cd ..
cd Server

git add .
git commit -m $m
git push origin master
cd ..
# merging in the other repos
# syncing the main repo with the 2 others repos

git checkout development
