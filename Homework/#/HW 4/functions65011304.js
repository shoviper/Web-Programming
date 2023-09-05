// function for the drop up
function setActiveNavLink() {
    var currentHash = window.location.hash;
  
    var navigationLinks = document.querySelectorAll('.bar a');

    navigationLinks.forEach(function(link) {
      link.classList.remove('active');
    });
  
    var activeLink = document.querySelector('.bar a[href="' + currentHash + '"]');

    if (activeLink) {
      activeLink.classList.add('active');
    }
}
  
window.addEventListener('load', setActiveNavLink);
window.addEventListener('hashchange', setActiveNavLink);


// function for the posting in each social link
function openFacebookShare(url) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function openLinkedInShare(url) {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function openTwitterShare(url) {
  window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank', 'width=600,height=400');
}